//// Controller

class Form {
  static handleSubmit(form) {
    const info = [...form];
    const packedInfo = {};

    info.forEach((i) => {
      if (i.name !== "") {
        packedInfo[i.name] = i.value;
        i.value = "";
      }
    });

    return packedInfo;
  }
}

//// Exports
export default Form;
