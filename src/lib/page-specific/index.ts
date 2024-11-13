import MyBespokeComponent from "./MyBespokeComponent.svelte";


export const TypeNames = {
  // Entry ---------------------------------
  'MyBespokeComponent': -1
};
export type TypeName = keyof typeof TypeNames;

export type ObjectType<T extends TypeName> =
  T extends 'MyBespokeComponent' ? typeof MyBespokeComponent :
  null;


export const get = <T extends TypeName>(component: T): ObjectType<T> => {

  if (!(component in TypeNames)) throw Error(`Unknown component: ${component}`);

  switch (component) {
    case 'MyBespokeComponent':
      return MyBespokeComponent as ObjectType<T>;

    // Unknown -----------------------------------------------------------------------------------
    default:
      throw Error(`Unimplemented component: ${component}`);
  }
}