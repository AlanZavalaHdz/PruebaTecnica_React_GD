import React, { useState, useEffect } from 'react';
import '../Styles/Styles.css';

function DatatableView() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ id: "", nombre: "", descripcion: "", precio: "" });
    const [modal, setModal] = useState({ actualizar: false, insertar: false });

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        const response = await fetch('http://api-test.michoacan.gob.mx/api/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const resultado = await response.json();
        setData(resultado.data);
    };

    const crearProducto = async () => {
        const response = await fetch('http://api-test.michoacan.gob.mx/api/productos/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nombre: form.nombre,
                descripcion: form.descripcion,
                precio: form.precio
            })
        });
        if (response.ok) {
            const productoNuevo = await response.json();
            setData([...data, productoNuevo]);
        }
        cerrarModalInsertar();
    };


    const actualizarProducto = async () => {
        await fetch(`http://api-test.michoacan.gob.mx/api/productos/modificar/${form.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({
                nombre: form.nombre,
                descripcion: form.descripcion,
                precio: form.precio
            })
        });
        obtenerProductos();
        cerrarModalActualizar();
    };


    const eliminarProducto = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await fetch(`http://api-test.michoacan.gob.mx/api/productos/eliminar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            obtenerProductos();
        }
    };

    const mostrarModalActualizar = (producto) => {
        setForm(producto);
        setModal({ ...modal, actualizar: true });
    };

    const cerrarModalActualizar = () => {
        setModal({ ...modal, actualizar: false });
    };

    const mostrarModalInsertar = () => {
        setForm({ id: "", nombre: "", descripcion: "", precio: "" });
        setModal({ ...modal, insertar: true });
    };

    const cerrarModalInsertar = () => {
        setModal({ ...modal, insertar: false });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <button className="button" onClick={mostrarModalInsertar}>
                    Agregar Producto
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>${producto.precio}</td>
                                <td>
                                    <button
                                        className="button button-edit"
                                        onClick={() => mostrarModalActualizar(producto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="button button-delete"
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modal.actualizar && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Editar Producto</h3>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>ID:</label>
                                <input
                                    type="text"
                                    value={form.id}
                                    readOnly
                                />
                            </div>
                            <div className="input-group">
                                <label>Nombre:</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.nombre}
                                />
                            </div>
                            <div className="input-group">
                                <label>Descripción:</label>
                                <input
                                    name="descripcion"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.descripcion}
                                />
                            </div>
                            <div className="input-group">
                                <label>Precio:</label>
                                <input
                                    name="precio"
                                    type="text"
                                    onChange={handleChange}
                                    value={form.precio}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="button" onClick={actualizarProducto}>
                                Editar
                            </button>
                            <button className="button" onClick={cerrarModalActualizar}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modal.insertar && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Insertar Producto</h3>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label>Nombre:</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Descripción:</label>
                                <input
                                    name="descripcion"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Precio:</label>
                                <input
                                    name="precio"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="button" onClick={crearProducto}>
                                Insertar
                            </button>
                            <button className="button" onClick={cerrarModalInsertar}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatatableView;
