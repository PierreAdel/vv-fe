import reactQuery from "../helpers/reactQuery";
import { FormProvider, useForm } from "react-hook-form";
import todoService from "../services/todo.service";
import { Button, Container, Input, Stack, Typography } from "@mui/material";
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
        <Stack direction="column" gap={2}>
          <Input
            sx={{ width: "50%" }}
            placeholder="Todo Title"
            {...methods.register("title", { required: true })}
          />
          <Input
            sx={{ width: "75%" }}
            placeholder="Todo Text"
            {...methods.register("text", { required: true })}
          />
        </Stack>
        <Button sx={{ mt: "2rem" }} variant="outlined" type="submit">
          Submit
        </Button>
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
    <Container sx={{ mt: 10 }} maxWidth="lg">
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
      <Typography variant="h5">Add a Todo</Typography>
      <AddTodoForm />
    </Container>
  );
}

export default Home;
