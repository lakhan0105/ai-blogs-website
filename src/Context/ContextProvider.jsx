import { createContext, useContext, useEffect, useState } from "react";
import { Client, Account, ID, Databases, Query } from "appwrite";
import { FaSleigh } from "react-icons/fa";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appwriteDatabaseId = import.meta.env.VITE_DATABASE_ID;
const appwriteCollectionId = import.meta.env.VITE_COLLECTION_ID;

// setup client for appwrite
const client = new Client()
  .setEndpoint(appwriteEndpoint) // Your API Endpoint
  .setProject(appwriteProjectId); // Your project ID
const account = new Account(client);

const myContext = createContext();

function ContextProvider({ children }) {
  // state to save the response from the api (this is read only data)
  const [blogText, setBlogText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInputBox, setShowInputBox] = useState(true);
  // authentication states
  const [currUser, setCurrUser] = useState(null);
  const [formInput, setFormInput] = useState({
    fName: "",
    email: "",
    password: "",
  });

  // function to handle form inputs
  function handleFormInput(e) {
    const key = e.target.name;
    const val = e.target.value;

    setFormInput((prev) => {
      return { ...prev, [key]: val };
    });
  }

  // function to get the response from the openai api
  async function talkToOpenAi(prompt) {
    const apiBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a detailed, structured blog post based on the following input. Regardless of how vague or unclear the input is, generate a blog post that is informative, engaging, and easy to read. The blog should include an introduction, body sections with headers, and a conclusion. User's input:${prompt} .If the input is not a specific or clear topic, create a general and informative post based on common knowledge or related subjects that would still provide value to the reader. provide the output in HTML format and only body element. it must be less than 60 words`,
        },
      ],
      temperature: 0.7,
    };

    try {
      setIsLoading(true);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify(apiBody),
      });

      const data = await resp.json();
      setIsLoading(false);
      setShowInputBox(false);

      setBlogText(data?.choices[0]?.message?.content);
      return { blogRes: data?.choices[0]?.message?.content };
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  // function to submit the blog to the database
  const publishBlog = async (data) => {
    const databases = new Databases(client);
    try {
      const result = await databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        ID.unique(),
        data
      );

      if (result) {
        return { success: true, msg: result };
      }
    } catch (error) {
      console.log(error);
      return { success: false, msg: error };
    }
  };

  // check if the user is present when page loads
  useEffect(() => {
    console.log("running context useeffect");
    checkUserStatus();
  }, []);

  // function to register a user
  const registerUser = async () => {
    try {
      const result = await account.create(
        ID.unique(), // ID
        formInput.email, // email
        formInput.password, // password
        formInput.fName // name
      );

      console.log(result);

      // login after registering
      await account.createEmailPasswordSession(
        formInput.email,
        formInput.password
      );

      // get account details of the user
      const accDetails = await account.get();
      if (accDetails) {
        setCurrUser(accDetails); // set the currUser state
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  // function to login the user
  const loginUser = async () => {
    try {
      const result = await account.createEmailPasswordSession(
        formInput.email,
        formInput.password
      );

      // get the latest acc details using account.get()
      const accDetails = await account.get();
      if (accDetails) {
        setCurrUser(accDetails);
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  // function to check user status
  const checkUserStatus = async () => {
    try {
      const accDetails = await account.get();
      setCurrUser(accDetails);
      return { success: true };
    } catch (error) {
      console.log(error);
      setCurrUser(null);
      return { success: false };
    }
  };

  // function to logoutUser
  const logoutUser = async () => {
    try {
      const result = await account.deleteSessions();
      if (result) {
        setCurrUser(null);
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  // function to list the blogs
  const listBlogs = async () => {
    const databases = new Databases(client);

    try {
      const result = await databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId,
        [Query.equal("authorId", [currUser.$id])]
      );

      if (result) {
        return {
          success: true,
          blogsList: result?.documents,
          totalBlogs: result?.total,
        };
      }
    } catch (error) {
      console.log("something went wrong in listBlogs");
      console.log(error);
      return { success: false, msg: error };
    }
  };

  // function to fetch a single blog
  const getBlog = async (docId) => {
    const databases = new Databases(client);

    try {
      const result = await databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        docId
      );
      console.log(result);

      if (result) {
        return { success: true, blogDetails: result };
      }
    } catch (error) {
      isLoading(false);
      console.log("Error in getBlog", error);
      return { success: false, error };
    }
  };

  // function to get all the blogs
  const getAllBlogs = async () => {
    const databases = new Databases(client);

    try {
      setIsLoading(true);
      const result = await databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId
      );
      setIsLoading(false);
      console.log(result);
      return {
        success: true,
        documents: result?.documents,
        total: result?.total,
      };
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return { success: false, error };
    }
  };

  return (
    <myContext.Provider
      value={{
        talkToOpenAi,
        blogText,
        isLoading,
        showInputBox,
        formInput,
        handleFormInput,
        registerUser,
        loginUser,
        checkUserStatus,
        currUser,
        logoutUser,
        publishBlog,
        listBlogs,
        getBlog,
        getAllBlogs,
      }}
    >
      {children}
    </myContext.Provider>
  );
}

export function useMyContext() {
  return useContext(myContext);
}

export default ContextProvider;
