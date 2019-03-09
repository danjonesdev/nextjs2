import axios from "axios";

const sanityHandle = async endpoint => {
  try {
    const res = await axios.get(endpoint);
    return { isLoaded: true, items: res.data };
  } catch (error) {
    return { isLoaded: true, error: error.message };
  }
};

export default sanityHandle;
