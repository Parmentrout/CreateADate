CREATE TABLE [dbo].[Activity]
(
	[ActivityId] INT NOT NULL PRIMARY KEY Identity,
	[LocationId] INT Not Null,
	[Name] varchar(50) Not null,
	[Address] varchar(255) null, 
    [ActivityOrder] INT NOT NULL, 
    [OptionId] INT NULL, 
    [Description] VARCHAR(255) NULL, 
    CONSTRAINT [FK_Activity_Location] FOREIGN KEY (LocationId) REFERENCES [Location]([LocationId])

)
