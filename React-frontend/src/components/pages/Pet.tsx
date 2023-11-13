
const obj: Record<string, string | number> = {
  prop1: "",
  prop2: 1,
}

export default function Pet() {

  const nose = () => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log(obj[key]);
      }
    }
  }
  return (
    <button onClick={nose}>Click</button>
  )
}
