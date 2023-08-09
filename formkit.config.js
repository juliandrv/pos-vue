import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        outer: "mb-5 ",
        label: "block mb-1 font-bold text-lg",
        message: "text-red-500",
        input:
          "w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400",
      },
      file: {
        noFiles: "block my-1",
        fileItem: "hidden",
      },
      submit: {
        input:
          "$reset bg-green-400 hover:bg-green-500 w-full p-3 font-bold uppercase rounded disabled:opacity-50",
      },
    }),
  },
};

export default config;
