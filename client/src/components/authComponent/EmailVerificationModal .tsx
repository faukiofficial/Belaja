import React, { useState, useRef, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { activateUser, selectAuthState } from "../../redux/slices/authSlice";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activationToken: string;
  openLoginModal: () => void;
  registeredEmail: string;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  activationToken,
  openLoginModal,
  registeredEmail,
}) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const [error, setError] = useState(false);
  const { activationError } = authState;

  useEffect(() => {
    if (activationError) {
      setError(true);
    }
  }, [activationError]);

  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    const newCode = [...verificationCode];
    if (newCode[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      newCode[index - 1] = "";
    } else {
      newCode[index] = "";
    }
    setVerificationCode(newCode);
    setError(false);
  };

  const activationCode = verificationCode.join("");

  useEffect(() => {
    if (!isOpen) {
      setVerificationCode(["", "", "", ""]);
    }
  }, [isOpen]);

  const handleAcitvateUser = async () => {
    const result = await dispatch(
      activateUser({ activationToken, activationCode })
    );
    if (result.meta.requestStatus === "fulfilled") {
      onClose();
      openLoginModal();
      setError(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setError(false);
      }}
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] 600px:w-[450px] 800px:w-[500px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 600px:p-6 outline-none font-Poppins">
        <h2 className="text-lg 800px:text-xl font-bold mb-6 800px:mb-8 dark:text-white">
          Activate Your Account
        </h2>
        <div className="text-center text-gray-700 dark:text-gray-300 mb-6 800px:mb-7">
          <p>Enter the activation code sent to your email</p>
          <p className="text-sm">(Expired in 5 minutes)</p>
          <p className="mt-1 text-sm 800px:text-xl text-blue-600 dark:text-blue-400">
            {registeredEmail}
          </p>
        </div>
        <div className="flex justify-center space-x-3 mb-6 800px:mb-8">
          {verificationCode.map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e) => {
                handleChange(index, e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-[50px] h-[50px] 600px:w-[60px] 600px:h-[60px] text-center text-lg 800px:text-xl border-2 rounded dark:bg-gray-700 dark:text-white ${
                error
                  ? "border-red-600 shake"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleAcitvateUser}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          disabled={authState.activationLoading}
        >
          {authState.activationLoading ? "Loading..." : "Activate"}
        </button>
      </Box>
    </Modal>
  );
};

export default EmailVerificationModal;
