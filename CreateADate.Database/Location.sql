CREATE TABLE [dbo].[Location]
(
	[LocationId] INT NOT NULL PRIMARY KEY Identity, 
    [Name] VARCHAR(50) NOT NULL, 
    [Address] VARCHAR(255) NULL, 
    [DateId] INT NULL, 
    [CreatedDate] DATETIMEOFFSET NULL, 
    CONSTRAINT [FK_Location_Date] FOREIGN KEY ([DateId]) REFERENCES [Date]([DateId])
)
