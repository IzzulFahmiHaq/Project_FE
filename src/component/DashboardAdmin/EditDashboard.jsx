import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { API_TOKO } from "../utils/BaseUrl";

const EditDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaMakanan, setNamaMakanan] = useState("");
  const [harga, setHarga] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [idAdmin, setIdAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData) {
      setIdAdmin(adminData.id);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_TOKO}/getById/${id}`);
        setNamaMakanan(response.data.namaMakanan);
        setHarga(response.data.harga);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data kue tidak ditemukan.",
          confirmButtonText: "OK",
        });
        navigate("/dashboard");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "namaMakanan") {
      setNamaMakanan(value);
    } else if (name === "harga") {
      setHarga(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaMakanan || !harga || parseFloat(harga) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Harap lengkapi semua kolom dengan benar!",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!idAdmin) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "ID Admin tidak ditemukan. Harap login terlebih dahulu.",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("kue", JSON.stringify({ namaMakanan, harga }));
    if (image) {
      formData.append("file", image);
    }

    try {
      const response = await axios.put(
        `${API_TOKO}/editByAdmin/${id}?idAdmin=${idAdmin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedKue = response.data;

      setNamaMakanan(updatedKue.namaMakanan);
      setHarga(updatedKue.harga.toString());
      setImageUrl(updatedKue.imageUrl);

      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Kue!",
        text: "Data kue berhasil diperbarui.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengedit Kue!",
        text: error.response?.data?.error || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Edit Data Kue</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="namaMakanan" className="block text-lg font-semibold mb-2">
              Nama Kue
            </label>
            <input
              type="text"
              id="namaMakanan"
              name="namaMakanan"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={namaMakanan}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="harga" className="block text-lg font-semibold mb-2">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              value={harga}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-lg font-semibold mb-2"
            >
              Gambar Kue
            </label>
            <input
              type="file"
              id="image"
              className="w-full p-3 border border-gray-700 bg-gray-700 rounded-md text-white"
              onChange={handleImageChange}
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Dessert"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-between">
            <button
              type="button"
              className="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-500"
              onClick={() => navigate("/dashboard")}
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDashboard;
