import { useEffect, useState } from 'react';
import logo from '../assets/react.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function Tasks() {
    const { currentUser } = useSelector(state => state.user);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchTasks = async () => {
            try {
                const task_criteria = {
                    assigned_to: currentUser.user._id,
                    status: "Pending"
                };
                console.log('Fetching tasks with criteria:', task_criteria);
                const response = await fetch('/api/task/get-tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task_criteria)
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();

                setTasks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [currentUser, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="w-full flex flex-wrap items-center bg-gray-100 p-2 border-b-4 border-yellow-400 min-h-16">
                <div className="w-2/3 px-2">
                    <h6 className="text-black text-lg font-semibold m-0">Tickets</h6>
                </div>
                <div className="w-1/3 flex justify-end items-center px-2">
                    <div className="relative">
                        <Link
                            className="cursor-pointer border border-blue-600 rounded-lg p-2 text-blue-600 inline-block"
                            role="button"
                        >
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="ml-1">
                        <input
                            className="border border-green-600 rounded p-2 text-green-600 text-sm cursor-pointer"
                            type="button"
                            value="Export Excel"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto"> {/* Added wrapper for vertical scrolling */}
                    <Table hoverable className="shadow-md min-w-[1200px]">
                        <Table.Head>
                            <Table.HeadCell className="whitespace-nowrap">Task #</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Description</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Status</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Assignee</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Team</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Internal Assignee</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Created At</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Due Date</Table.HeadCell>
                            <Table.HeadCell className="whitespace-nowrap">Last Updated</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {tasks.map((task) => (
                                <Table.Row key={task._id}>
                                    <Table.Cell className="whitespace-nowrap">{task.task_num}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.description}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.status}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.assigned_to?.name}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.team?.name}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.internal_assigned_to?.name || 'N/A'}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{new Date(task.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{new Date(task.updatedAt).toLocaleDateString()}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}
