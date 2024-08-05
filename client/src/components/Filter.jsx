import { Modal, Button, TextInput, Select, Label } from 'flowbite-react';
import { useState, useEffect } from 'react';

export default function Filter() {
    const [filter, setFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/client/get-clients');
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.message);
                } else {
                    setClients(data);
                }
            } catch (error) {
                console.error('Error fetching clients:', error.message);
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <Modal
                show={filter}
                onClose={() => setFilter(false)}
                popup
                size='lg'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="keyword" value="Keyword" />

                                    <TextInput
                                        placeholder='Keyword'
                                        id='keyword'
                                        className='flex-1'
                                        onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                                    />
                                </div>
                                <Select
                                    label='Client'
                                    id='client'
                                    className='flex-1'
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                >
                                    {clients.map((client) => (
                                        <option value={client._id}>
                                            {client.client_name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </form>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => setFilter(false)}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setFilter(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
