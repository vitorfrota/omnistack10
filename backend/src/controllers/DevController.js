const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req,res){
        const devs = await Dev.find();

        return res.json(devs);
    },
    async store(req, res){
        const { github_username, techs, longitude, latitude } = req.body;
    
        let dev = await Dev.findOne({ github_username }); // se já tem cadastro

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { avatar_url, bio, name = login } = response.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }  
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });     
        }
        return res.send(dev);
    },

    async update(req,res){
        const { dev_id } = req.params;

        if(!req.body){
            return res.status(400).json({ error: 'Dados não foram passados'});
        }

        const { name, techs, bio, avatar_url, latitude, longitude } = req.body;

        const techsArray = parseStringAsArray(techs);
        try{
             await Dev.findByIdAndUpdate(dev_id, {
                name,
                techs,
                bio,
                avatar_url,
                techs: techsArray,
                latitude,
                longitude
            });
            return res.status(200).json('Dev atualizado com sucesso!');
        }catch(err){
            return res.status(400).json({ error: 'Não foi possível atualizar o dev'});
        }
    },

    async destroy(req,res){
        const { dev_id } = req.params;
        try{
            await Dev.findByIdAndDelete(dev_id);
            return res.status(200).json('Dev excluído com sucesso!');
        }catch(error){
            return res.status(400).json({ error: 'Não foi possível deletar o dev'});
        }
    }
}