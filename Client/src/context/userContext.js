import React from "react";

const CreateUserStateContext = React.createContext(undefined);
const CreateUserDispatchContext = React.createContext(undefined);

function UserProvider({ children }) {
  const [user, setUser] = React.useState();
  const [isSignedIn, setSignedIn] = React.useState(false);

  const handleUserChange = (temp) => {
    setUser(temp);
  };

  const handleSignedInChange = (newTemp) => {
    setSignedIn(newTemp);
  };

  return (
    <CreateUserStateContext.Provider value={{ user, isSignedIn }}>
      <CreateUserDispatchContext.Provider
        value={{ handleUserChange, handleSignedInChange }}
      >
        {children}
      </CreateUserDispatchContext.Provider>
    </CreateUserStateContext.Provider>
  );
}

const useCreateUserStateContext = () => {
  const context = React.useContext(CreateUserStateContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

const useCreateUserDispatchContext = () => {
  const context = React.useContext(CreateUserDispatchContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

export {
  UserProvider,
  useCreateUserStateContext,
  useCreateUserDispatchContext,
};
