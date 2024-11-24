<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/gameAwards">
        <html>
            <head>
                <title>Game Awards Winners</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Game Awards Winners</h1>
                <table>
                    <tr>
                        <th>Year</th>
                        <th>Winner</th>
                        <th>Developer</th>
                    </tr>
                    <xsl:for-each select="year">
                        <tr>
                            <td><xsl:value-of select="yearNumber" /></td>
                            <td><xsl:value-of select="winner" /></td>
                            <td><xsl:value-of select="developer" /></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
