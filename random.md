-- Create the database
CREATE DATABASE IF NOT EXISTS surgimind_db;
USE surgimind_db;

-- ========================
-- USERS TABLE
-- ========================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    auth_provider ENUM('LOCAL', 'GOOGLE') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- CASES TABLE
-- ========================
CREATE TABLE cases (
    case_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    case_name VARCHAR(255) NOT NULL,
    summary TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ========================
-- WORK AREA TABLE
-- ========================
CREATE TABLE work_area (
    work_id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    video_clip VARCHAR(500),
    snapshot VARCHAR(500),
    measurements TEXT,
    recorded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(case_id) ON DELETE CASCADE
);

-- ========================
-- TOOLS TABLE
-- ========================
CREATE TABLE tools (
    tool_id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    tool_name VARCHAR(255) NOT NULL,
    video_url VARCHAR(500),
    frame_data TEXT,
    notes TEXT,
    FOREIGN KEY (case_id) REFERENCES cases(case_id) ON DELETE CASCADE
);

-- ========================
-- MEASUREMENTS TABLE
-- ========================
CREATE TABLE measurements (
    measure_id INT AUTO_INCREMENT PRIMARY KEY,
    work_id INT NOT NULL,
    tool_id INT,
    metric_name VARCHAR(255) NOT NULL,
    metric_value FLOAT,
    unit VARCHAR(10),
    FOREIGN KEY (work_id) REFERENCES work_area(work_id) ON DELETE CASCADE,
    FOREIGN KEY (tool_id) REFERENCES tools(tool_id) ON DELETE SET NULL
);
