import { useRouter } from "next/router";

let Codename = () => {
  const router = useRouter();
  const { codename } = router.query;

  return (
    <div>
      <h1>{codename}</h1>
    </div>
  );
};

export default Codename;
