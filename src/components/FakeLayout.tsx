// This component is required to wrap Login in something
// Used to implement layout-based routing
// Otherwise, does nothing

const FakeLayout = (props: any) => {
  return <>{props.children}</>;
};

export default FakeLayout;
