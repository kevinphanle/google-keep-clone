import React, {useRef, useEffect} from 'react';

const Modal = (props) => {

  const outsideRef = useRef(null);

  const closeModal = () => {
    props.setModalOpen(false);
  }

  useOutsideClick(outsideRef, closeModal);

  return (
    <div className="modal" ref={outsideRef}>
      Modal
    </div>
  )
}


function useOutsideClick(ref, func) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        func(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export default Modal;