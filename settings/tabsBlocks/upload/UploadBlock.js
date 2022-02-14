import React  from "react";
import {FileDrop} from "react-file-drop";
import AddBtn from "./AddBtn";
import apiEmployees from "../../../../../api/employees";
import apiFreelancers from "../../../../../api/freelancers";
import FilesList from "./FilesList";
import {useTranslation} from "react-i18next";

const UploadBlock = ({user,userType,getUser,showUpload,currentFiles,onSave=false,onDelete=false,}) => {
    const {t} = useTranslation();

    const saveFiles=async(files)=>{

        if(onSave){
            return onSave(files);
        }

        let formData = new FormData();
        for(let file of files){
            formData.append("education_file", file);
        }
        if(user && userType){
            let api = user.Employee ? apiEmployees : apiFreelancers;
            await api.put(formData, `/${user[userType].id}`).then(r => {
                console.log(r);
            });
        }
        if(getUser){
            getUser();
        }
    };


    let files =currentFiles || (
        (user && userType &&  user[userType]?.education_files &&  user[userType]?.education_files.length) ?  user[userType]?.education_files : false
    );

    return <FileDrop onDrop={(files, e) =>{
        saveFiles(files)
    }}>
        {!!(showUpload || files) &&
            <div className={" upload__block " + ((!files ||  !files.length) ? " upload-content__drag-drop upload-content__drag-drop__old" : " upload-content__files")}>
                {(files && files.length)
                ?
                    <FilesList onDelete={onDelete} showUpload={showUpload} files={files} saveFiles={saveFiles} getUser={getUser} user={user}/>
                :
                    !!(showUpload) &&
                    <>
                         <div className="wrap-btn-add">

                             <AddBtn saveFiles={saveFiles}/>
                         </div>
                         <p>
                             <span>{t('Or drag and drop here')}</span>
                             <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path
                                     d="M17.7694 8.80042C17.4946 8.80042 17.2748 9.02025 17.2748 9.29504V13.7942C17.2748 15.018 16.2782 16.0109 15.0582 16.0109H4.20586C2.98214 16.0109 1.98924 15.0143 1.98924 13.7942V9.22176C1.98924 8.94697 1.76941 8.72714 1.49462 8.72714C1.21983 8.72714 1 8.94697 1 9.22176V13.7942C1 15.5639 2.43989 17.0001 4.20586 17.0001H15.0582C16.8278 17.0001 18.264 15.5602 18.264 13.7942V9.29504C18.264 9.02391 18.0442 8.80042 17.7694 8.80042Z"
                                     fill="#0E7D7D" stroke="#0E7D7D" strokeWidth="0.5"/>
                                 <path
                                     d="M12.4278 9.22898L10.1269 11.5299L10.1269 1.49461C10.1269 1.21982 9.90704 0.999988 9.63225 0.999988C9.35746 0.999988 9.13763 1.21982 9.13763 1.49461L9.13763 11.5299L6.83674 9.22898C6.74148 9.13372 6.61325 9.08242 6.48867 9.08242C6.36044 9.08242 6.23587 9.13005 6.14061 9.22898C5.94643 9.42316 5.94643 9.73459 6.14061 9.92877L9.28419 13.0723C9.37578 13.1639 9.50402 13.2189 9.63225 13.2189C9.76415 13.2189 9.88872 13.1676 9.98032 13.0723L13.1239 9.92877C13.3181 9.73459 13.3181 9.42316 13.1239 9.22898C12.9334 9.03846 12.6183 9.03846 12.4278 9.22898Z"
                                     fill="#0E7D7D" stroke="#0E7D7D" strokeWidth="0.5"/>
                             </svg>
                         </p>
                     </>
                }
            </div>
        }
    </FileDrop>
};

export default UploadBlock;
