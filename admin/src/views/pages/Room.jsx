import { getRoomData } from "../../Api";
import { useEffect, useState } from "react"
import "./Room.scss";
import { object } from "prop-types";

export default function Room() {
    const [rooms, setRooms] = useState({
    });



    useEffect(() => {
        getRoomData().then(({ data }) => {
            setRooms(data);
            console.log(data);
        })
    }, [])
    return (
        <div>
            <h1 className="text-center font-bold text-blue-950 text-3xl m-4">Quản lý phòng</h1>


            <table id="customers">

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Hoạt động</th>
                </tr>
                {/*  */}

                {/* {rooms.rooms && Object.values(rooms.rooms).map((room) => (

                    <tr>
                        <td>{room.id}</td>
                        <td>{room.name}</td>
                        <td>{room.email}</td>
                        <td>{room.status}</td>
                        <td>
                            <button className="bg-blue-950 text-white px-2 py-1 rounded-md cursor-grab m-2" onClick={() => onAdd(room.i)} > Thêm</button>
                            <button className="bg-green-950 text-white px-2 py-1 rounded-md  cursor-grab m-2" onClick={() => onEdit(room.i)}>Sửa</button>
                            <button className="bg-red-950 text-white px-2 py-1 rounded-md  cursor-grab m-2" onClick={() => onDelete(room.i)}>Xóa</button>


                        </td>
                    </tr>
                ))} */}



            </table>
            {/* {typeof (rooms)} */}
            <pre>{JSON.stringify(rooms, null, 2)}</pre>
        </div >
    )
}