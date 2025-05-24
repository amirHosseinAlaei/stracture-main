import React from "react";
import { Row, Col, Form, Upload } from "antd";
import { InboxOutlined, CloseCircleOutlined } from "@ant-design/icons";
import SignatureUpload from "./SigantureUpload";

const { Dragger } = Upload;

const ImageUploadSection = ({
  form,
  avatarFileList,
  avatarPreviewUrls,
  handleAvatarChange,
  handleRemoveAvatar,
  validateImageFiles,
}) => (
  <Row className="mb-8" gutter={16}>
    {/* آپلود عکس کاربر */}
    <Col xs={24} md={12}>
      <Form.Item
        label="عکس کاربر"
        name="AvatarFile"
        valuePropName="fileList"
        getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[
          {
            validator: (_, fileList) => {
              if (!fileList || fileList.length === 0) return Promise.resolve();
              const error = validateImageFiles(fileList, 1);
              return error ? Promise.reject(new Error(error)) : Promise.resolve();
            },
          },
        ]}
      >
        <>
          <Dragger
            name="avatar"
            multiple={false}
            beforeUpload={() => false}
            accept="image/*"
            showUploadList={false}
            fileList={avatarFileList}
            onChange={handleAvatarChange}
            disabled={avatarFileList.length >= 1}
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
              برای بارگزاری عکس کلیک کنید یا فایل را بکشید و رها کنید
            </p>
            <p className="ant-upload-hint mt-3 text-gray-600">
              فقط یک عکس، فرمت تصویری و حداکثر ۲ مگابایت
            </p>
          </Dragger>
          {avatarPreviewUrls.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {avatarPreviewUrls.map((img) => (
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
                    src={img.url}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CloseCircleOutlined
                    onClick={() => handleRemoveAvatar(img.uid)}
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
      </Form.Item>
    </Col>
    {/* آپلود امضا */}
    <Col xs={24} md={12}>
      <Form.Item
        label="امضا"
        name="SignatureFile"
        valuePropName="fileList"
        getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[
          {
            validator: (_, fileList) => {
              if (!fileList || fileList.length === 0) return Promise.resolve();
              const error = validateImageFiles(fileList, 1);
              return error ? Promise.reject(new Error(error)) : Promise.resolve();
            },
          },
        ]}
      >
        <SignatureUpload form={form} />
      </Form.Item>
    </Col>
  </Row>
);

export default ImageUploadSection;
