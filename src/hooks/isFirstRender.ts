import { useEffect, useState } from "react";

const useIsFirstRender = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
};

export { useIsFirstRender };
