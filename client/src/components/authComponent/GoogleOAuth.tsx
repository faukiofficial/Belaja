import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { socialAuth } from "../../redux/slices/authSlice";

interface GoogleOAuth {
  onClose: () => void;
}

interface DecodedUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleOAuth: React.FC<GoogleOAuth> = ({onClose}) => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("No credential received");
      return;
    }

    const token = response.credential;
    const decodedUser = jwtDecode<DecodedUser>(token);
    console.log("User Info:", decodedUser);

    const result = await dispatch(
      socialAuth({
        name: decodedUser.name,
        email: decodedUser.email,
        picture: decodedUser.picture,
      })
    );

    if (socialAuth.fulfilled.match(result) && result.payload?.success) {
      onClose();
    } else {
      console.log("Login failed:", result);
      onClose();
    }
  };

  const handleLoginFailure = () => {
    console.error("Google login failed:");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default GoogleOAuth;
