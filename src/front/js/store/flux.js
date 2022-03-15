import { toast } from "react-toastify";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userName: [],
    },

    actions: {
      getCurrentSession: () => {
        const session = JSON.parse(localStorage.getItem("session"));
        return session;
      },
      setSessionStore: (token, user_id, roles) => {
        const payload = { token, user_id, roles };
        localStorage.setItem("session", JSON.stringify(payload));
        setStore({ session: payload });
      },
      _fetch: async (url, options = {}) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        if (session != null) {
          options.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          };
        } else {
          options.headers = { "Content-Type": "application/json" };
        }
        const response = await fetch(process.env.BACKEND_URL + url, options);
        if (response.status >= 200 && response.status < 400) {
          return await response.json();
        } else if (response.status >= 400 && response.status < 500) {
          const error = await response.json();
          toast(error.message);
        } else {
          alert("Unknown Error");
          console.log(await response.text());
        }
      },
      createUser: async (email, password) => {
        const actions = getActions();
        const options = {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        const payload = await actions._fetch(`/api/user`, options);
        actions.setSessionStore(payload.token, payload.id, payload.roles);
        return payload;
      },
      createNewSession: async (email, password) => {
        const actions = getActions();
        const options = {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
        };
        const payload = await actions._fetch(`/api/token`, options);
        actions.setSessionStore(payload.token, payload.user_id, payload.roles);
        return payload;
      },
      getChildren: async () => {
        const actions = getActions();
        return await actions._fetch(`/api/children`);
      },
      getSelf: async () => {
        const actions = getActions();
        return await actions._fetch(`/api/guardian`);
      },
      clearSession: () => {
        localStorage.removeItem("session");
        setStore({ session: null });
      },
    },
  };
};

export default getState;
