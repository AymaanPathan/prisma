import axios from "axios";
// register
export const registerApi = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/register`,
      {
        name,
        email,
        password,
      },
    );
    console.log(name,email,password);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
