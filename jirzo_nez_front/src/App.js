import "./App.scss";
import routes from "./config/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { AuthProvider } from "./Provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Fragment key={index}>
              <Route
                path={route.path}
                exact={route.exact}
                element={
                  <route.layout>
                    <route.element />
                  </route.layout>
                }
              />
            </Fragment>
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
