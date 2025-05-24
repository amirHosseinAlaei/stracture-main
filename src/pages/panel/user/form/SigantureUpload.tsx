
import React from "react";
import { Upload } from "antd";
import { InboxOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const SignatureUpload = ({ form }) => {
  const [fileList, setFileList] = React.useState([]);

  const onChange = info => {
    let files = info.fileList.slice(-1); // فقط یک فایل
    setFileList(files);
    form.setFieldsValue({ SignatureFile: files });
  };

  const onRemove = file => {
    const newList = fileList.filter(f => f.uid !== file.uid);
    setFileList(newList);
    form.setFieldsValue({ SignatureFile: newList });
  };

  return (
    <>
      <Dragger
        name="signature"
        multiple={false}
        beforeUpload={() => false}
        accept="image/*"
        showUploadList={false}
        fileList={fileList}
        onChange={onChange}
        onRemove={onRemove}
        style={{
          padding: 24,
          borderRadius: 12,
          borderColor: "#1890ff",
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#1890ff" }} />
        </p>
        <p className="ant-upload-text text-lg font-semibold">
          برای بارگزاری امضا کلیک کنید یا فایل را بکشید و رها کنید
        </p>
        <p className="ant-upload-hint mt-3 text-gray-600">
          فقط یک تصویر امضا، حداکثر ۲ مگابایت
        </p>
      </Dragger>
      {fileList.length > 0 && (
        <div className="flex gap-3 mt-4 flex-wrap">
          {fileList.map((img) => (
            <div
              key={img.uid}
              style={{
                position: "relative",
                width: 90,
                height: 90,
                borderRadius: 8,
                border: "1px solid #eee",
                overflow: "hidden",
              }}
            >
              <img
                src={img.url || img.thumbUrl || URL.createObjectURL(img.originFileObj)}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <CloseCircleOutlined
                onClick={() => onRemove(img)}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  color: "red",
                  fontSize: 20,
                  cursor: "pointer",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                title="حذف تصویر"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SignatureUpload;
