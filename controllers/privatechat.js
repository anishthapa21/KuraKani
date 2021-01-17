module.exports = function(async, Users){
    return {
        SetRouting: function(router){
            router.get('/chat/:name', this.getchatPage);
            router.post('/char/:name', this.chatPostPage);
        },
        getchatPage: function(req,res){
            async.parallel([
                function(callback){
                    Users.findOne({'username':req.user.username})
                    .populate('request.userId')
                    .exec((err, result)=>{
                        callback(err, result);
                    })
                }
            ], (err,results)=>{
                const result1 = results[0];
                // console.log(result1.request[0].userId); 
                res.render('private/privatechat', {title:'KuraKani - Private Chat', user:req.user, groupname:name, data:result1 });
        
            });
        },
         chatPostPage: function(req, res, next){
             const params = req.params.name.split('.');
             const nameParams = params[0];
             const nameRegex = new RegExp("^"+nameParams.toLowercase(), "i");

             async.waterfall ({[
                 function(callback){
                     if(req.body.message){
                         Users.findOne ({'username': {$regex: nameRegex}, (err.data) => {
                             callback(err, data);
                         }});
                     }
                 }

                 function(data,callback) {
                    if(req.body.message){
                        const newMessage = new MessageChannel();
                        newMessage.sender =req.user._id;
                        newMessage.receiver = data._id;
                        newMessage.senderName = req.user.username;
                        newMessage.receiverName = data.username;
                        newMessage.message= req.body.message;
                        newMessage.userImage = req.user.userImage;
                        newMessage.CreatedAt = new Date();

                        newMessage.save(err, result) => {
                            if(err){
                                return next(err);
                            }
                            callback(err, result);
                        }
                        
                    }
                 }

                ], (err, results) => {
                    res.redirect('/chat/'+req.params.name);
             })
         }
        }
    }
}   

