import React, { useState } from 'react';
import { Modal, Button, FloatButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import VoiceChat from '../../../helpers/voice/VoiceChat.js';
import { SoundOutlined } from '@ant-design/icons';

const VoiceModal = () => {
  const [visible, setVisible] = useState(false);

  const showVoiceChatModal = () => {
    setVisible(true);
  };

  const closeVoiceChatModal = () => {
    setVisible(false);
  };

  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      <FloatButton
        icon={<SoundOutlined />}
        onClick={showVoiceChatModal}
      >
        <AiOutlineUserAdd />
      </FloatButton>

      <Modal
        visible={visible}
        onOk={closeVoiceChatModal}
        onCancel={closeVoiceChatModal}
        footer={[
          <Button key="close" onClick={closeVoiceChatModal}>
            Close
          </Button>
        ]}
      >
        <VoiceChat displayName={currentUser.displayName} />
      </Modal>
    </div>
  );
};

export default VoiceModal;
