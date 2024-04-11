import Modal from 'react-modal';
import NaverMapsComponent from '../naver_maps.component';

const MapModalComponent = ({ modalIsOpen, closeModal }: any) => {
    const customStyles = {
        content: {
            width: '50%',
            height: '80%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <NaverMapsComponent address="current"></NaverMapsComponent>
            </Modal>
        </>
    );
};

export default MapModalComponent;
