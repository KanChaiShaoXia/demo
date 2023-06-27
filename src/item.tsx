import { useSelector } from "react-redux";
import { StoreType, store, updateAction } from "./store";
import { useObservable } from "rxjs-hooks";
import { ObservableBlockMap, selectData } from "./rx-store";
import { of } from "rxjs";

export const Item = (props: { id: string }) => {
  const { id } = props;

  // const block = useObservable(() => {
  //   const block$ = selectData(id);
  //   return block$ ?? of(store.getState()[id]);
  // }, store.getState()[id]);

  const block = useSelector((state: StoreType) => {
    return state[id];
  });

  const onChange = (title: string) => {
    // selectData(id)?.next({ id, title });
    store.dispatch(updateAction.updateBlock({ id, title }));
  };

  return (
    <textarea
      value={block?.title}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
