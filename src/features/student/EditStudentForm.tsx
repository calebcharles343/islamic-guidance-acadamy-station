import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import SpinnerMini from "../../ui/SpinnerMini";
import { FormTypes, StudentType } from "../../interfaces";
import toast from "react-hot-toast/headless";
import { useUpdateStudent } from "./useUpdateStudent";
// import { useLogout } from "./useLogout";
// import { BiLogOut } from "react-icons/bi";

interface EditVerificationFormProps {
  student: StudentType;
  setIsEdit: (value: boolean) => void;
}

const stations = [
  { id: "NGKW-1446-2401", name: "NGKW-1446-2401" },
  { id: "NGOY-1446-2401", name: "NGOY-1446-2401" },
];

const EditStudentForm: React.FC<EditVerificationFormProps> = ({
  student,
  setIsEdit,
}) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormTypes>({
    name: student.name,
    mrn: student.mrn,
    fileNumber: student.fileNumber,
    dateOfBirth: student.dateOfBirth,
    phone: student.phone,
    ethnicGroup: student.ethnicGroup,
    stateOfOrigin: student.stateOfOrigin,
    residentialAddress: student.residentialAddress,
    occupation: student.occupation,
    familyHouseName: student.familyHouseName,
    fhrn: student.fhrn,
    nin: student.nin,
    bvn: student.bvn,
    station: student.station,
  });

  useEffect(() => {
    setFileInputState("");
  }, []);

  const { updateStudent, isPending } = useUpdateStudent(student.id);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (previewSource === null) {
    //   toast.error("Please provide your photo");
    //   return;
    // }

    const data = {
      form: formData,
      photo: previewSource,
    };

    updateStudent(data as any);

    setPreviewSource(null);
    setIsEdit(false);
  };

  return (
    <div
      className=" flex flex-col h-screen text-white overflow-y-scroll mt-4 pb-4 "
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="py-10 flex flex-col items-center justify-center">
        <div className=" mb-4 flex flex-col items-center gap-2">
          <h1 className="text-sm md:text-lg  font-extrabold">
            ISLAMIC GUIDANCE ACADAMY STATION
          </h1>
          <p>Update Verification</p>
        </div>

        <div className=" w-full md:w-[400px] flex items-center justify-center gap-2">
          <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="text-center text-sm font-bold w-24 h-24 border">
                {previewSource ? (
                  <img
                    src={previewSource}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  "PASSPORT"
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              <label
                htmlFor="imageInput"
                className="flex items-center justify-center text-[10px] border border-solid border-white bg-slate-800 rounded-sm cursor-pointer w-24 sm:w-24 p-2"
              >
                Upload Photo
              </label>
            </div>
            <div className=" flex flex-col  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10  bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg mx-4 md:mx-0">
              <div className="flex flex-col w-full gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mrn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    MRN
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="mrn"
                    type="text"
                    placeholder="Enter your MRN"
                    value={formData.mrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fileNumber"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    File Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="fileNumber"
                    type="text"
                    placeholder="Enter your file number"
                    value={formData.fileNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Date Of Birth
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="dateOfBirth"
                    type="text"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="ethnicGroup"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Ethnic Group
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="ethnicGroup"
                    type="text"
                    placeholder="Enter ethnic group"
                    value={formData.ethnicGroup}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stateOfOrigin"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    State Of Origin
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="stateOfOrigin"
                    type="text"
                    placeholder="Enter your state of origin"
                    value={formData.stateOfOrigin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="residentialAddress"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Residential Address
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="residentialAddress"
                    type="text"
                    placeholder="Enter your residential address"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="occupation"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Occupation
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="occupation"
                    type="text"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="familyHouseName"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Family House Name
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="familyHouseName"
                    type="text"
                    placeholder="Enter your family house name"
                    value={formData.familyHouseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fhrn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    FHRN
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="fhrn"
                    type="text"
                    placeholder="Enter your FHRN"
                    value={formData.fhrn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="nin"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    National Identification Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="nin"
                    type="text" // Use "text" instead of "number"
                    placeholder="National identification number"
                    value={formData.nin}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bvn"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Bank Verification Number
                  </label>
                  <input
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="bvn"
                    type="text" // Use "text" instead of "number"
                    placeholder="Bank verification number"
                    value={formData.bvn}
                    pattern="\d{11}" // Enforces exactly 11 digits
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="station"
                    className="block mb-1 font-bold text-gray-700"
                  >
                    Station
                  </label>
                  <select
                    className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
                    id="station"
                    value={formData.station}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a station</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
                disabled={isPending}
              >
                {isPending ? <SpinnerMini /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentForm;
