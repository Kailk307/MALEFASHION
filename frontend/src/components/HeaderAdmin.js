import React from 'react';
import { FaDashcube, FaPowerOff, FaUser } from 'react-icons/fa';

export default function HeaderAdmin() {
    return (
        <section className="hdl-header sticky-top">
            <div className="container-fluid">
                <ul className="menutop">
                    <li>
                        <a href='http://localhost:3000/admin/'>
                            <FaDashcube /> Shop Thời trang
                        </a>
                    </li>
                    <li className="text-phai">
                        <a href='#st'>
                            <FaPowerOff /> Thoát
                        </a>
                    </li>
                    <li className="text-phai">
                        <a href='#st'>
                            <FaUser /> Chào quản lý
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
