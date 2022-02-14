import React from "react";
import AddBtn from "./AddBtn";
import apiEmployees from "../../../../../api/employees";
import apiFreelancers from "../../../../../api/freelancers";
import {useParams} from "react-router";

const FilesList = ({files,saveFiles,user,getUser,showUpload,onDelete}) => {

    const {type, id} = useParams();

    const getIconType=(item)=>{
        let extension = item.file_name?.split('.')?.pop();

        if(extension==='jpeg')
            extension='jpg';

        try{
            return  require(`../../../../../images/fileIcons/${extension.toUpperCase()}.svg`).default;
        }catch (e) {
            return  require(`../../../../../images/fileIcons/OTHER.svg`).default;
        }
    };

    const deleteFile=(e,item)=>{
        e.preventDefault();


        if(user){
            let api = user.Employee ? apiEmployees : apiFreelancers;
            if (api) {
                api.remove(item.id,'/files').then(res => {
                    getUser();
                }).catch(err => console.log('err', err));
            }
        }
        if(onDelete){
            onDelete(item)
        }


    };


    return <>
        <div className="upload-content__files-list">

            {!!files && files.map(file=>
                <div className="form-group" key={file.id || file.file_name}>
                    <img alt={file.file_name} src={getIconType(file)}/>

                    <p>
                        <a href={file.disk_name} download target="_blank">{file.file_name}</a>
                    </p>

                    <div className="upload-content__files-list__options">
                        {!!((type && id || showUpload)) &&
                        <button className="button button-close" onClick={(e)=>deleteFile(e,file)}></button>
                        }
                    </div>
                </div>
            )}
        </div>
        <div className="upload-content__files-upload__button">
            {!!(type && id || showUpload) &&
            <AddBtn className={"btn-add btn-add_second"} saveFiles={saveFiles}/>
            }
        </div>
        </>
};


export default FilesList;
