import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import { useSelector } from "react-redux";
import { Button, Alert, Divider } from  "antd";
import Title from "antd/es/typography/Title";
import { decrypt } from "../../hashing";
// import appId from '../appId.js';
let audioTracks = {
    localAudioTrack: null,
    remoteAudioTracks: {},
};
const VoiceChat = (props) => {
    const [members, setMembers] = useState([])
    const chatInfo = useSelector(state => state.chat.chatInfo)
    const displayName = useSelector(state => state.auth.user.displayName)
    const roomId = chatInfo.uid

    const appid = "108ba2dc964e4efe930d30c3c13d861d"

    const token = null
    const rtcUid = Math.floor(Math.random() * 2032)
    const rtmUid = String(Math.floor(Math.random() * 2032))



    const [micMuted, setMicMuted] = useState(true)

    let rtcClient;
    let rtmClient;
    let channel;

    const initRtm = async (name) => {

        rtmClient = AgoraRTM.createInstance(appid)
        await rtmClient.login({ 'uid': rtmUid, 'token': token })

        channel = rtmClient.createChannel(roomId)
        await channel.join()

        await rtmClient.addOrUpdateLocalUserAttributes({ 'name': name, 'userRtcUid': rtcUid.toString() })

        getChannelMembers()


        channel.on('MemberJoined', handleMemberJoined)
        channel.on('MemberLeft', handleMemberLeft)
    }



    const initRtc = async () => {
        rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        //rtcClient.on('user-joined', handleUserJoined)
        rtcClient.on("user-published", handleUserPublished)
        rtcClient.on("user-left", handleUserLeft);


        await rtcClient.join(appid, roomId, token, rtcUid)
        audioTracks.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        audioTracks.localAudioTrack.setMuted(micMuted)
        await rtcClient.publish(audioTracks.localAudioTrack);



        initVolumeIndicator()
    }

    let initVolumeIndicator = async () => {

        //1
        AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
        rtcClient.enableAudioVolumeIndicator();

        //2
        rtcClient.on("volume-indicator", volumes => {
            volumes.forEach((volume) => {
                console.log(`UID ${volume.uid} Level ${volume.level}`);
            });
        })
    }



    let handleUserPublished = async (user, mediaType) => {
        await rtcClient.subscribe(user, mediaType);

        if (mediaType == "audio") {
            audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
            user.audioTrack.play();
        }
    }

    let handleUserLeft = async (user) => {
        delete audioTracks.remoteAudioTracks[user.uid]
    }

    let handleMemberJoined = async (MemberId) => {
        let { name, userRtcUid } = await rtmClient.getUserAttributesByKeys(MemberId, ['name', 'userRtcUid'])
        console.log(name)

    }

    let handleMemberLeft = async (MemberId) => {
        console.log(MemberId)
    }

    let getChannelMembers = async () => {
        const membersList = await channel.getMembers()
        setMembers(membersList)
    }

    const toggleMic = async (e) => {
        setMicMuted(!micMuted)

        audioTracks.localAudioTrack.setMuted(micMuted)
    }



    const enterRoom = async () => {
        initRtc()
        initRtm(displayName)
    }

    let leaveRtmChannel = async () => {
        await channel.leave()
        await rtmClient.logout()
    }

    let leaveRoom = async () => {
        audioTracks.localAudioTrack.stop()
        audioTracks.localAudioTrack.close()
        rtcClient.unpublish()
        rtcClient.leave()

        leaveRtmChannel()

    }
    console.log(members)
    return (
        <div>
            {/* Your JSX structure here */}
            <Button onClick={enterRoom} >Odaya Katıl</Button>
            <Button onClick={toggleMic} >Mikrofonu Aç</Button>
            <Button onClick={leaveRoom} >Odadan Ayrıl</Button>
            <Divider/>
            <Alert type="info" message="Bu modal ses sisteminin test aşaması için kullanılmaktadır. Sesli sohbet işlevleri sayfadaki hareketli elemente aktarılacaktır." showIcon/>
        </div>
    );
}

export default VoiceChat;
