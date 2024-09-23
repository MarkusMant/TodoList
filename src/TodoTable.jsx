function TodoTable(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Task</th>
                    <th>Date</th>
                </tr>
                {
                    props.todos.map((desc, index) =>
                        <tr key={index}>
                            <td>{desc.description}</td>
                            <td>{desc.date}</td>
                            <td><button onClick={() => props.handleDelete(index)}>Done</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}
export default TodoTable;