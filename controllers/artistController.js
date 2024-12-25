const Artist = require('../models/artistModel')
const getAllArtists = async(req,res)=>{
    try{
      const artists = await Artist.find()
      res.status(200).json({success:true,artists})
    }catch (error){
       res.status(500).json({success:false,message:error.message})
    }
}
const addArtist = async(req,res)=>{
    try{
      const {name,grammy} = req.body
      const newArtist = new Artist({name,grammy})
      await newArtist.save()
      res.status(201).json({success:true,artist:newArtist})
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
const updateArtist = async(req,res)=>{
    try{
       const {id} = req.params
       const updateArtist = await Artist.findByIdAndUpdate(id,req.body,{new:true})
       if(!updateArtist){
          return res.status(404).json({success:false,message:'Artist not found'})
       }
       res.status(200).json({success:true,artist:updateArtist})
    }
    catch(error){
       res.status(500).json({success:false,message:error.message})
    }
}
const deleteArtist = async(req,res)=>{
    try{
         const {id} = req.params;
         const artist = await Artist.findByIdAndDelete(id)
         if(!artist){
            return res.status(404).json({success:false,message:'Artist not found'})
         }
         res.status(200).json({success:true,message:'Artist deleted successfully'})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

// Get artist by ID
const getArtistById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find artist by ID
        const artist = await Artist.findOne({ artist_id: id });

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        // Respond with artist details
        res.status(200).json({
            artist_id: artist.artist_id,
            name: artist.name,
            grammy: artist.grammy,
            hidden: artist.hidden,
        });
    } catch (error) {
        console.error('Error fetching artist:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {getAllArtists,addArtist,updateArtist,deleteArtist,getArtistById}
