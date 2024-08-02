import Client from '../models/client.model.js';
import Speciality from '../models/speciality.model.js';
import { errorHandler } from '../utils/error.js';

export const getClients = async (req, res, next) => {
    const { clientName, clientEmail, clientPhone, clientAddress, contactPerson, SpecialityId } = req.body;
    
    try {
        const query = {};

        if(clientName) query.client_name = { $regex: clientName, $options: 'i' };
        if(clientEmail) query.client_email = { $regex: clientEmail, $options: 'i' };
        if(clientPhone) query.client_phone = { $regex: clientPhone, $options: 'i' };
        if(clientAddress) query.client_address = { $regex: clientAddress, $options: 'i' };
        if(contactPerson) query.contact_person = { $regex: contactPerson, $options: 'i' };
        if(SpecialityId) query.speciality_id = SpecialityId;

        const clients = await Client.find(query);
        res.status(200).json(clients);
  } catch (error) {
    return next(errorHandler(error.code || 500, error.message || "Internal server error"));
  }
};

const generateEntityName = async (clientName) => {
  let entityName = clientName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("");
  
  let uniqueEntityName = entityName;
  let counter = 1;

  while (await Client.findOne({ entity: uniqueEntityName })) {
    uniqueEntityName = `${entityName}${counter}`;
    counter++;
  }
  return uniqueEntityName;
};

const createCustomerId = async (clientName) => {
  let unique = false;
  let customerId = "";

  while (!unique) {
    customerId = Math.floor(100000000 + Math.random() * 900000000);

    const existingClient = await Client.findOne({ customer_id: customerId });
    if (!existingClient) unique = true;
  }
  return customerId;
};

export const createClient = async (req, res, next) => {
    const { clientName, clientEmail, clientPhone, clientAddress, contactPerson, SpecialityId } = req.body;
    try {
      const speciality = await Speciality.findById(SpecialityId);
      if(!speciality) return next(errorHandler(404, "Speciality not found"));

      const entity = await generateEntityName(clientName);
      const customerId = await createCustomerId(clientName);
      const newClient = await Client.create({
          client_name: clientName, 
          client_email: clientEmail, 
          client_phone: clientPhone, 
          client_address: clientAddress, 
          contact_person: contactPerson, 
          speciality_id: SpecialityId,
          entity: entity,
          customer_id: customerId
        });
        res.status(201).json(newClient);
    } catch (error) {
        return next(errorHandler(error.code || 500, error.message || "Internal server error"));
    }
}
