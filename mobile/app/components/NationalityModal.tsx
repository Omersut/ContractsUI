import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Button } from 'react-native';

interface NationalityModalProps {
    isModalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedNationality: React.Dispatch<React.SetStateAction<string>>;
}

const NationalityModal: FC<NationalityModalProps> = ({ isModalVisible, setModalVisible, setSelectedNationality }) => {
    return (
        <Modal visible={isModalVisible} transparent={true}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => { setSelectedNationality("American"); setModalVisible(false); }}>
                        <Text>American</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedNationality("German"); setModalVisible(false); }}>
                        <Text>German</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedNationality("Turkish"); setModalVisible(false); }}>
                        <Text>Turkish</Text>
                    </TouchableOpacity>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );
};

export default NationalityModal;
