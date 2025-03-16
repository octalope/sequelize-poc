-- USE [master];
-- GO

-- IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'newuser')
-- BEGIN
--     CREATE LOGIN [newuser] WITH PASSWORD = 'Lochness1!', CHECK_POLICY = OFF;
--     ALTER SERVER ROLE [sysadmin] ADD MEMBER [newuser];
-- END
-- GO


-- create the user on the master database
USE [master];
CREATE LOGIN [newuser] WITH PASSWORD=N'Lochness1!';
GO

USE [master];
CREATE USER [newuser] FOR LOGIN [newuser];
GO

-- create the database
CREATE DATABASE [test];
GO

-- create the user on the target database for the login
USE [test];
CREATE USER [newuser] FOR LOGIN [newuser];
GO

-- add the user to the desired role
USE [test];
ALTER ROLE [db_owner] ADD MEMBER [newuser];
GO

-- SQL_END
