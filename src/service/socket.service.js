import {User} from '../models';
let mapIdIdUserIdSocket=new Map();

module.exports={
    cbSocket:(socket)=>{
        console.log(`a user connected socket.id ${socket.id}`);
  socket.on('disconnect', async function (data) {
    console.log("disconnect "+socket.idUser)
    if(socket.idUser){
      //const formation=await formationService.getFormationById(socket.idFormation);
      module.exports.deleteIntoMapIdSocketIdUser({idUser:socket.idUser});
    }
  });
  socket.on('join', async function (data) {
    console.log(data);
    console.log("data");
    console.log(data);
		if (!data.idUser) {
      console.log("into error")
			socket.emit('custom_error', { message: 'id not found or invalid' });
			return;
		}
    else{
      console.log("Hello")
      const user = await User.findById(data.idUser);
      console.log("user")
      console.log(user)
      console.log("user")
      if (user) {
        socket.idUser=user._id.toString();
        // Add the new data user
        module.exports.insereIntoMapIdSocketIdUser({idSocket:socket.id,idUser:user._id.toString()})
        console.log(mapIdIdUserIdSocket)
      }
      else{
        socket.emit('custom_error', { message: 'User not found or invalid' });
        return ;
      }
    }
	});
},
    insereIntoMapIdSocketIdUser:({idSocket, idUser})=>{
        mapIdIdUserIdSocket.set(idUser,idSocket)
        return mapIdIdUserIdSocket.get(idUser);
    },
    deleteIntoMapIdSocketIdUser:({idUser})=>{
        mapIdIdUserIdSocket.delete(idUser)
        return mapIdIdUserIdSocket
    },
    getOneSocket:({idUser})=>{
        return mapIdIdUserIdSocket.get(idUser)
    },
    getmapIdIdUserIdSocket:()=>{
        return mapIdIdUserIdSocket
    }
}