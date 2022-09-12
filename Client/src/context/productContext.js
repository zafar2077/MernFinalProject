import React from "react";

const CreateProductsStateContext = React.createContext(undefined);
const CreateProductsDispatchContext = React.createContext(undefined);

function ProductsProvider({ children }) {
  const [products, setProducts] = React.useState();

  const handleProductsChange = (temp) => {
    setProducts(temp);
  };

  return (
    <CreateProductsStateContext.Provider value={{ products }}>
      <CreateProductsDispatchContext.Provider value={handleProductsChange}>
        {children}
      </CreateProductsDispatchContext.Provider>
    </CreateProductsStateContext.Provider>
  );
}

const useCreateProductsStateContext = () => {
  const context = React.useContext(CreateProductsStateContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

const useCreateProductsDispatchContext = () => {
  const context = React.useContext(CreateProductsDispatchContext);

  if (context === undefined) {
    throw Error("useUserContext must be inside userProvider");
  }

  return context;
};

export {
  ProductsProvider,
  useCreateProductsStateContext,
  useCreateProductsDispatchContext,
};
