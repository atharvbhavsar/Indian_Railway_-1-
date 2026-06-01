import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function StationFormFields(props) {
  const { 
    aomPointsmen, stationMastersDirectory, aomTrainManagers, trafficInspectors, 
    aomSuperintendents, setActivePage, setSelectedSMProfile, setSelectedTIProfile,
    isChartZoomModalOpen, setIsChartZoomModalOpen, selectedChartType, zoomPopupPage, setZoomPopupPage,
    zoomPopupSearch, setZoomPopupSearch, zoomPopupZone, setZoomPopupZone, zoomPopupDivision, setZoomPopupDivision,
    zoomPopupStationName, setZoomPopupStationName, zoomPopupStationCode, setZoomPopupStationCode,
    zoomPopupCategory, setZoomPopupCategory, zoomPopupRisk, setZoomPopupRisk, zoomPopupStatus, setZoomPopupStatus,
    zoomPopupStartDate, setZoomPopupStartDate, aomAllStations, renderCategoryBadge, renderRiskBadge, renderStatusBadge,
    stationFormData, handleStationFormChange, aomReviewTab, setAomReviewTab
  } = props;

  const renderStationFormFields = (isReadOnly = false) => {
    return (
      <>
        <div className="add-user-grid station-grid">
          <div className="add-user-col">
            <div className="form-group">
              <label>Station Name *</label>
              <input
                type="text"
                name="stationName"
                value={stationFormData.stationName}
                onChange={handleStationFormChange}
                placeholder="Enter station name"
                className={stationFormErrors.stationName ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.stationName && <span className="error-text">{stationFormErrors.stationName}</span>}
            </div>

            <div className="form-group">
              <label>Station Code *</label>
              <input
                type="text"
                name="stationCode"
                value={stationFormData.stationCode}
                onChange={handleStationFormChange}
                placeholder="e.g. PUNE, NDLS"
                className={stationFormErrors.stationCode ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.stationCode && <span className="error-text">{stationFormErrors.stationCode}</span>}
            </div>

            <div className="form-group">
              <label>Zone *</label>
              <select
                name="zone"
                value={stationFormData.zone}
                onChange={handleStationFormChange}
                className={stationFormErrors.zone ? "error" : ""}
                disabled={isReadOnly}
              >
                <option value="">Select Zone</option>
                {stationZoneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {stationFormErrors.zone && <span className="error-text">{stationFormErrors.zone}</span>}
            </div>

            <div className="form-group">
              <label>Division *</label>
              <select
                name="division"
                value={stationFormData.division}
                onChange={handleStationFormChange}
                className={stationFormErrors.division ? "error" : ""}
                disabled={isReadOnly}
              >
                <option value="">Select Division</option>
                {stationDivisionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {stationFormErrors.division && <span className="error-text">{stationFormErrors.division}</span>}
            </div>

            <div className="form-group">
              <label>Station Category *</label>
              <select
                name="category"
                value={stationFormData.category}
                onChange={handleStationFormChange}
                className={stationFormErrors.category ? "error" : ""}
                disabled={isReadOnly}
              >
                <option value="">Select Category</option>
                {stationCategoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {stationFormErrors.category && <span className="error-text">{stationFormErrors.category}</span>}
            </div>

            <div className="form-group">
              <label>Station Type *</label>
              <select
                name="stationType"
                value={stationFormData.stationType}
                onChange={handleStationFormChange}
                className={stationFormErrors.stationType ? "error" : ""}
                disabled={isReadOnly}
              >
                <option value="">Select Station Type</option>
                {stationTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {stationFormErrors.stationType && <span className="error-text">{stationFormErrors.stationType}</span>}
            </div>
          </div>

          <div className="add-user-col">
            <div className="form-group">
              <label>Number of Platforms *</label>
              <input
                type="number"
                min="0"
                name="platforms"
                value={stationFormData.platforms}
                onChange={handleStationFormChange}
                placeholder="Enter number of platforms"
                className={stationFormErrors.platforms ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.platforms && <span className="error-text">{stationFormErrors.platforms}</span>}
            </div>

            <div className="form-group">
              <label>Number of Tracks *</label>
              <input
                type="number"
                min="0"
                name="tracks"
                value={stationFormData.tracks}
                onChange={handleStationFormChange}
                placeholder="Enter number of tracks"
                className={stationFormErrors.tracks ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.tracks && <span className="error-text">{stationFormErrors.tracks}</span>}
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={stationFormData.address}
                onChange={handleStationFormChange}
                placeholder="Enter address"
                className={stationFormErrors.address ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.address && <span className="error-text">{stationFormErrors.address}</span>}
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={stationFormData.city}
                onChange={handleStationFormChange}
                placeholder="Enter city"
                className={stationFormErrors.city ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.city && <span className="error-text">{stationFormErrors.city}</span>}
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={stationFormData.state}
                onChange={handleStationFormChange}
                placeholder="Enter state"
                className={stationFormErrors.state ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.state && <span className="error-text">{stationFormErrors.state}</span>}
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="number"
                min="0"
                name="pincode"
                value={stationFormData.pincode}
                onChange={handleStationFormChange}
                placeholder="Enter pincode"
                className={stationFormErrors.pincode ? "error" : ""}
                readOnly={isReadOnly}
              />
              {stationFormErrors.pincode && <span className="error-text">{stationFormErrors.pincode}</span>}
            </div>
          </div>
        </div>

        <div className="station-additional-grid">
          <div className="form-group">
            <label>Station Master Name (Optional)</label>
            <input
              type="text"
              name="stationMasterName"
              value={stationFormData.stationMasterName}
              onChange={handleStationFormChange}
              placeholder="Enter station master name"
              readOnly={isReadOnly}
            />
          </div>

          <div className="form-group">
            <label>Contact Number *</label>
            <input
              type="text"
              name="contactNumber"
              value={stationFormData.contactNumber}
              onChange={handleStationFormChange}
              placeholder="Enter contact number"
              className={stationFormErrors.contactNumber ? "error" : ""}
              readOnly={isReadOnly}
            />
            {stationFormErrors.contactNumber && <span className="error-text">{stationFormErrors.contactNumber}</span>}
          </div>

          <div className="form-group">
            <label>Email ID *</label>
            <input
              type="email"
              name="emailId"
              value={stationFormData.emailId}
              onChange={handleStationFormChange}
              placeholder="Enter email ID"
              className={stationFormErrors.emailId ? "error" : ""}
              readOnly={isReadOnly}
            />
            {stationFormErrors.emailId && <span className="error-text">{stationFormErrors.emailId}</span>}
          </div>

          <div className="form-group">
            <label>Latitude *</label>
            <input
              type="text"
              name="latitude"
              value={stationFormData.latitude}
              onChange={handleStationFormChange}
              placeholder="Enter latitude"
              className={stationFormErrors.latitude ? "error" : ""}
              readOnly={isReadOnly}
            />
            {stationFormErrors.latitude && <span className="error-text">{stationFormErrors.latitude}</span>}
          </div>

          <div className="form-group">
            <label>Longitude *</label>
            <input
              type="text"
              name="longitude"
              value={stationFormData.longitude}
              onChange={handleStationFormChange}
              placeholder="Enter longitude"
              className={stationFormErrors.longitude ? "error" : ""}
              readOnly={isReadOnly}
            />
            {stationFormErrors.longitude && <span className="error-text">{stationFormErrors.longitude}</span>}
          </div>

          <div className="form-group status-toggle-group">
            <label>Status</label>
            <button
              type="button"
              className={`status-toggle-btn ${stationFormData.status === "Active" ? "active" : "inactive"}`}
              onClick={handleStationStatusToggle}
              disabled={isReadOnly}
            >
              {stationFormData.status}
            </button>
          </div>
        </div>
      </>
    );
  };

  return renderStationFormFields();
}
