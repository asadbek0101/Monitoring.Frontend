import AppContainerLayout from "../components/app/AppContainerLayout";
import TodosTab from "../components/todos/TodosTab";

export default function TodosContainer(){
    return (
        <AppContainerLayout>
            <TodosTab/>
        </AppContainerLayout>
    )
}