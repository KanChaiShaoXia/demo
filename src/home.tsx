import { isEqual, keys } from "lodash-es";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Item } from "./item";
import { StoreType, defaultState, store, updateAction } from "./store";

export const Home = () => {
  const stateKeys = useSelector((state: StoreType) => {
    const blockKeys = keys(state);
    return blockKeys;
  }, isEqual);

  useEffect(() => {
    store.dispatch(updateAction.updateBlocks({ blocks: defaultState }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {stateKeys.map((id) => (
        <Item id={id} key={id} />
      ))}
    </div>
  );
};
