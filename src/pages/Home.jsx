import reactQuery from "../helpers/reactQuery";
import { FormProvider, useForm } from "react-hook-form";
import todoService from "../services/todo.service";
import "./Home.css";

function AddTodoForm() {
  const methods = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    mode: "onBlur",
  });

  const createTodoMutation = reactQuery.useCustomMutation(
    todoService.create,
    "todo",
    () => {
      methods.reset();
    },
  );

  const onSubmit = async (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="gap-2 flex flex-col">
          <input
            className="border border-black rounded-lg py-2 px-2"
            placeholder="Todo Title"
            {...methods.register("title", { required: true })}
          />
          <input
            className="border border-black rounded-lg py-2 px-2"
            placeholder="Todo Text"
            {...methods.register("text", { required: true })}
          />
        </div>
        <button
          className="mt-2 border border-black rounded-lg py-2 px-10 text-lg text-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
function Home() {
  const { data } = reactQuery.useCustomQuery("todo", {}, () =>
    todoService.getAll(),
  );

  const deleteTodoMutation = reactQuery.useCustomMutation(
    todoService.remove,
    "todo",
  );

  return (
    <div className="px-72 mt-4 container">
      <ul>
        {data?.documents?.length > 0 &&
          data?.documents?.map((todo) => (
            <li
              key={todo._id}
              onClick={() => deleteTodoMutation.mutate({ id: todo._id })}
            >
              {todo.title}: {todo.text}
            </li>
          ))}
      </ul>
      <h1>Add a Todo</h1>
      <AddTodoForm />
    </div>
  );
}

export default Home;
