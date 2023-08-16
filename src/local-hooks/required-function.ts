import STORE from "../../src/config/store";

export default (v: any) => !!v || STORE.requiredMessage;