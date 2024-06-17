import {
    ChangeEvent,
    MouseEvent,
    ReactElement,
    useEffect,
    useState
} from "react";

import "./index.scss";
import CalendarEvent from "../../../schemas/calendarEvent";
import { createEvent } from "../../../api/event";
import { deleteEvent } from "../../../api/delete";
import { updateEvent } from "../../../api/updateEvent";
import { AxiosError } from "axios";

type propsType = Readonly<{
    show: boolean,
    close: () => void,
    myEvent: CalendarEvent|undefined,
    callback?: (event: CalendarEvent, opt: String) => void
}>

const nowDate = new Date();
const nowDateString = `${nowDate.getFullYear()}-${(nowDate.getMonth() + 1).toString().padStart(2, "0")}-${nowDate.getDate().toString().padStart(2, "0")}`;

export default function NewEvent(props: propsType): ReactElement {
    const {
        show,
        close,
        myEvent,
        callback,
    } = props;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<string>(nowDateString);
    const [endTime, setEndTime] = useState<string>(nowDateString);
    const [tagText, setTagText] = useState<string>("");
    const [colorText, setColorText] = useState<string>("");
    const [tags, setTags] = useState<Array<string>>([]);

    useEffect(() => {
        if (show === false && myEvent!==undefined) {
            setTitle(myEvent.title)
            setDescription(myEvent.description)
            const date = new Date();
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            setStartTime(`${myEvent.start.getFullYear()}-${(myEvent.start.getMonth() + 1).toString().padStart(2, "0")}-${myEvent.start.getDate().toString().padStart(2, "0")}`);
            setEndTime(`${myEvent.end.getFullYear()}-${(myEvent.end.getMonth() + 1).toString().padStart(2, "0")}-${myEvent.end.getDate().toString().padStart(2, "0")}`);
            setTagText("");
            setColorText(myEvent.color);
            setTags(myEvent.tags);
        }
    }, [show]);

    function setNavigate(arg0: string) {
        throw new Error("Function not implemented.");
    }

    return <div className="viewEvent" data-show={show} onClick={(event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains("viewEvent"))
            close();
    }}>
        <div className="box">
            <button className="close material-symbols-outlined" onClick={() => close()}>close</button>

            <h2>View Event</h2>
            <div className="row">
                <div className="key">Title</div>
                <div className="value">
                    <input type="text" value={title} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value);
                    }}></input>
                </div>
            </div>
            <div className="row">
                <div className="key">Description</div>
                <div className="value">
                    <input type="text" value={description} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value);
                    }}></input>
                </div>
            </div>
            <div className="row">
                <div className="key">Start Time</div>
                <div className="value">
                    <input type="date" value={startTime} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setStartTime(event.target.value);
                    }}></input>
                </div>
            </div>
            <div className="row">
                <div className="key">End Time</div>
                <div className="value">
                    <input type="date" value={endTime} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setEndTime(event.target.value);
                    }}></input>
                </div>
            </div>
            <div className="row">
                <div className="key">Color</div>
                <div className="value">
                    <input type="text" value={colorText} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setColorText(event.target.value);
                    }}></input>
                </div>
            </div>
            <div className="row">
                <div className="key">Tags</div>
                <div className="value">
                    <input type="text" value={tagText} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTagText(event.target.value);
                    }} />
                    <button onClick={() => {
                        setTagText(v => {
                            if (v === "")
                                return v;
                            setTags(tagList => {
                                if (tagList.includes(v))
                                    return tagList;
                                return [...tagList, v]
                            })
                            return "";
                        })
                    }}>Add</button>
                </div>
            </div>
            <div className="tags">
                {tags.map((v, i) => <div key={`${v}${i}`} className="tag" onClick={() => {
                    setTags(v => v.filter((v, j) => j !== i));
                }}>
                    {v}
                </div>
                )}
            </div>
            <button className="update" onClick={() => {
                console.log(`${endTime}T${(new Date()).toISOString().split("T")[1]}`);
                if(myEvent === undefined) return
                updateEvent({
                    id: myEvent.id,
                    title: title,
                    start: startTime,
                    end: endTime,
                    description: description,
                    eventClass: myEvent.eventClass,
                    color: colorText,
                    tags: tags,
                }).then(data => {
                    if (callback) {
                        callback(data, "update");
                    }
                })
                close();
            }}>Update</button>

            <button className="delete" onClick={() => {
                console.log(`${endTime}T${(new Date()).toISOString().split("T")[1]}`);
                if(myEvent === undefined) return;
                deleteEvent({
                    id: myEvent.id,
                }).then(() => {
                    if (callback) {
                        callback(myEvent, "delete");
                    }
                    localStorage.setItem("deleteEventStatus", "success");
                    console.log("deleteEvent success.");
                    //刷新頁面
                }).catch((error: AxiosError) => {
                    const data = error.response?.data as {
                        message: string
                    }
                });
                close();
            }}>Delete</button>
        </div>
    </div >
}