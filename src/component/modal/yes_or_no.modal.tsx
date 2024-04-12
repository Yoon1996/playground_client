import Modal from 'react-modal';
import ButtonComponent from '../button.component';

const YesOrNoModal = ({ modalIsOpen, closeModal, deleteOk }: any) => {
    const customStyles = {
        content: {
            width: '20%',
            height: '20%',
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
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <div className="w-full h-full flex flex-col justify-center gap-5 font-semibold">
                    <div className="flex justify-center">정말 삭제하시겠습니까?</div>
                    <div className="flex gap-4">
                        <ButtonComponent ment="아니오" click={closeModal}></ButtonComponent>
                        <ButtonComponent click={deleteOk} ment="예"></ButtonComponent>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default YesOrNoModal;
