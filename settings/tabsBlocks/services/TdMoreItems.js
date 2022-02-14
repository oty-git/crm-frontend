import React, {useRef, useState} from "react";
import useOutsideClick from "../../../../../utils/useOutsideClick";


const TdMoreItems=({data,name,value})=>{

    const [show,setShow]=useState(false);

    const node = useRef();

    useOutsideClick(node, () => {
        setShow(false);
    });

        return<td className={"center__stat"} ref={node}>
            {!!(data && data.length) &&
            <React.Fragment>
                <div className="row-group row-group--nowrap row-group--sm row-group--justify-start-important">
                    <div className="row-group__item">
                        <p>
                            {data[0][name]}
                            <span className={data[0][value].toString()?.indexOf("-")!==-1? "text-brick-red" : "text-surfie-green"}>({data[0][value]})</span>
                        </p>
                    </div>
                    <div className="row-group__item ">
                        {data.length>1 &&
                        <button className="button button--shadow button--white button--size-30"
                                type="button"
                                onClick={()=>setShow(!show)}
                        >
                            <svg className="svg-icon svg-icon--surfie-green" width="15" height="9">
                                <use href="/images/svg/svg-sprite/symbol/sprite.svg#eye" x="0" y="0"></use>
                            </svg>
                        </button>
                        }
                    </div>
                </div>
                {!!show &&
                    <div className="float__fee" >
                        {data.map((item)=>{
                            return <div key={item.id} className="elem__fee ">
                                <p>{item[name]} (
                                    <span className={item[value].toString()?.indexOf("-")!==-1? "text-brick-red" : "text-surfie-green"}>{item[value]}</span>
                                    )</p>
                            </div>
                        })}
                    </div>
                }
            </React.Fragment>

            }


                </td>
};
export default TdMoreItems;
