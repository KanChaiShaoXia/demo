import { of } from "rxjs";
import { useObservable } from "rxjs-hooks";
import { selectData } from "./rx-store";
import { store, updateAction } from "./store";

export const Item = (props: { id: string }) => {
  const { id } = props;

  const block = useObservable(() => {
    const block$ = selectData(id);
    return block$ ?? of(store.getState()[id]);
  }, store.getState()[id]);

  const onChange = (title: string) => {
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
